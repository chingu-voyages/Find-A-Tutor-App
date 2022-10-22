const Footer = () => {
  return (
    <div>
      <footer className="footer p-9 lg:p-10 text-base-content">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex flex-col gap-1">
            <span className="footer-title text-[1rem] normal-case opacity-100">
              Links
            </span>
            <a className="link hover:no-underline underline-offset-4">Chingu</a>
            <a className="link hover:no-underline underline-offset-4">
              API Link
            </a>
            <a className="link hover:no-underline underline-offset-4">
              Github Repo
            </a>
          </div>
          <div className="flex flex-col gap-1">
            <span className="footer-title text-[1rem] normal-case opacity-100">
              Our Team
            </span>
            <a className="link hover:no-underline underline-offset-4">
              Teammate LinkedIn #1
            </a>
            <a className="link hover:no-underline underline-offset-4">
              Teammate LinkedIn #2
            </a>
            <a className="link hover:no-underline underline-offset-4">
              Teammate LinkedIn #3
            </a>
            <a className="link hover:no-underline underline-offset-4">
              Teammate LinkedIn #4
            </a>
          </div>
        </div>
      </footer>
      <footer className="w-full p-8 pt-0 text-md lg:px-10 lg:py-4 text-base-content">
        <p>
          (App Name) is a web app created by a team of volunteers from Chingu,
          using (Tech Stack). Click{' '}
          <a href="#" className="underline">
            here
          </a>{' '}
          to now more about how Chingu works.
        </p>
      </footer>
    </div>
  );
};

export default Footer;
