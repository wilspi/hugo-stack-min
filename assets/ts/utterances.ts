let utterancesLoaded = false;

function setUtterancesTheme(theme: string): void {
    let utterances = document.querySelector('.utterances iframe') as HTMLIFrameElement | null;
    if (utterances) {
        utterances.contentWindow?.postMessage(
            {
                type: 'set-theme',
                theme: `github-${theme}`
            },
            'https://utteranc.es'
        );
    }
}

addEventListener('message', (event: MessageEvent) => {
    if (event.origin !== 'https://utteranc.es') return;

    /// Called when Utterances is ready
    utterancesLoaded = true;
    setUtterancesTheme(document.documentElement.dataset.scheme || '');
});

window.addEventListener('onColorSchemeChange', (e: CustomEvent<string>) => {
    if (!utterancesLoaded) return;
    setUtterancesTheme(e.detail);
});