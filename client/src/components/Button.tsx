type Props = {
  text: string;
  custom: string[];
};

const Button = ({ text, custom }: Props) => {
  const classes = custom.join(' ');

  return (
    <button
      className={`btn btn-primary h-min normal-case text-neutral px-6 text-lg ${classes}`}
    >
      {text}
    </button>
  );
};

export default Button;
