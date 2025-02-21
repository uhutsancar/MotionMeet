import { Injectable, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Link } from './link.types';

@Injectable({
    providedIn: 'root',
})
export class LinkService implements OnDestroy {
    private routeListener: Subscription = new Subscription();

    private site: string = '';

    constructor(
        @Inject(DOCUMENT) private readonly document: Document,
        private readonly router: Router,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {
        if (isPlatformBrowser(this.platformId)) {
            this.site = window.location.origin;
        }
        if (isPlatformServer(this.platformId)) {
            this.site = 'https://motionmeet.com.tr';
        }
    }

    public startRouteListener(): void {
        this.routeListener = this.router.events
            .pipe(filter((event) => event instanceof NavigationEnd))
            .subscribe(() => {
                let url = '';
                const urlTree = this.router.parseUrl(this.router.url);

                if (urlTree.root.hasChildren()) {
                    const segments = urlTree.root.children['primary'].segments;

                    if (segments && segments.length > 0) {
                        url = segments.map((segment) => segment.path).join('/');
                    }
                }

                this.updateTag({
                    rel: 'canonical',
                    href: `${this.site}/${url}`,
                });
            });
    }

    public updateTag(tag: Link): void {
        const selector = this._parseSelector(tag);

        const linkElement =
            (<HTMLLinkElement>this.document.head.querySelector(selector)) ||
            this.document.head.appendChild(this.document.createElement('link'));

        if (linkElement) {
            Object.keys(tag).forEach((prop: string) => {
                (linkElement as any)[prop] = tag[prop];
            });
        }
    }

    public updateTags(tags: Link[]): void {
        tags.forEach((tag) => {
            const selector = this._parseSelector(tag);
            const linkElement =
                (this.document.head.querySelector(selector) as HTMLLinkElement) ||
                this.document.head.appendChild(this.document.createElement("link"));

            if (linkElement) {
                Object.keys(tag).forEach((prop: string) => {
                    (linkElement as any)[prop] = tag[prop];
                });
            }
        });
    }

    public removeTag(tag: Link): void {
        const selector = this._parseSelector(tag);
        const linkElement = <HTMLLinkElement>this.document.head.querySelector(selector);

        if (linkElement) {
            this.document.head.removeChild(linkElement);
        }
    }

    public removeTags(tags: Link[]): void {
        tags.forEach((tag) => {
          const selector = this._parseSelector(tag);
          const linkElement = this.document.head.querySelector(selector) as HTMLLinkElement;
      
          if (linkElement) {
            this.document.head.removeChild(linkElement);
          }
        });
      }

    public getTag(tag: Link): HTMLLinkElement | null {
        const selector = this._parseSelector(tag);

        return this.document.head.querySelector(selector);
    }

    public getTags(): NodeListOf<HTMLLinkElement> {
        return this.document.head.querySelectorAll('link');
    }

    private _parseSelector(tag: Link): string {
        const relAttr: string = tag.rel ? `[rel="${tag.rel}"]` : "";
        return `link${relAttr}`;
      }

    ngOnDestroy(): void {
        this.routeListener.unsubscribe();
    }
}
