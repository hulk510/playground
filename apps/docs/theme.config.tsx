export default {
  logo: <span>Portfolio</span>,
  project: {
    link: 'https://github.com/hulk510/playground',
  },
  useNextSeoProps() {
    return {
      titleTemplate: '%s – Portfolio',
    };
  },
  banner: {
    key: 'banner-text',
    text: (
      <p>🎉 This is a portfolio site (WIP) for testing various features.</p>
    ),
  },
  footer: {
    text: (
      <span>
        MIT {new Date().getFullYear()} ©{' '}
        <a href='https://github.com/hulk510' target='_blank'>
          hulk510
        </a>
        .
      </span>
    ),
  },
};
