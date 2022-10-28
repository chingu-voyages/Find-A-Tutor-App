type Props = {
  text: string;
  custom?: string[];
};

const Button = ({ text, custom }: Props) => {
  const classes = custom && custom.join(' ');

  return (
    <button
      className={`btn btn-primary normal-case text-neutral px-6 py-2 text-md w-full lg:text-lg lg:w-auto lg:py-1 min-h-min h-min ${classes}`}
    >
      {text}
    </button>
  );
};

export default Button;
