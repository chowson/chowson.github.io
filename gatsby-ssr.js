const React = require('react');

exports.onRenderBody = function ({ setPreBodyComponents }) {
  setPreBodyComponents([
    React.createElement('script', {
      key: 'theme-switcher',
      dangerouslySetInnerHTML: {
        __html: `
          (function() {
            function setTheme(newTheme) {
                window.__theme = newTheme;
                document.body.setAttribute('data-theme', newTheme);
                if(newTheme === 'theme-dark') { document.body.classList.add('dark'); }
                else { document.body.classList.remove('dark'); }
            }

            var preferredTheme;
            try {
                preferredTheme = localStorage.getItem('theme');
            } catch (err) { }

            window.__setPreferredTheme = function(newTheme) {
                setTheme(newTheme);
                try {
                localStorage.setItem('theme', newTheme);
                } catch (err) {}
            }

            var darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

            darkQuery.addListener(function(e) {
                window.__setPreferredTheme(e.matches ? 'theme-dark' : 'theme-light');
            });

            setTheme(preferredTheme || (darkQuery.matches ? 'theme-dark' : 'theme-light'));
        })();
      `,
      },
    }),
  ]);
};
