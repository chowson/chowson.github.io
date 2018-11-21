module CustomBlog
{
    export class LazyLoadImages
    {
        private _observer: IntersectionObserver;

        public Initialise(): void
        {
            let lazyImages = document.querySelectorAll(".lazy");

            if(!lazyImages)
            {
                console.log("lazyImages: " + !lazyImages);
                return;
            }

            const config = {
                rootMargin: '50px 0px',
                threshold: 0.01
            };

            this._observer = new IntersectionObserver(this.OnIntersection.bind(this), config);
            lazyImages.forEach(image => {
                this._observer.observe(image);
            });
        }

        private OnIntersection(entries: IntersectionObserverEntry[]): void
        {
            entries.forEach(entry => {
                if(entry.intersectionRatio)
                {
                    this._observer.unobserve(entry.target);
                    this.PreloadImage(<HTMLImageElement>entry.target);
                }
            });
        }

        private PreloadImage(imageElement: HTMLImageElement): void
        {
            let image = jQuery(imageElement);
            
            if (!image.data('src'))
            {
                return;
            }

            imageElement.src = image.data('src');;
        }
    }
}

jQuery(document).ready(() => {
    new CustomBlog.LazyLoadImages().Initialise();
});