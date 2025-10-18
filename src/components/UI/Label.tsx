type labelProps = {
  htmlFor?: string;
  children: React.ReactNode;
};

function Label({ children, htmlFor }: labelProps) {
  function childrenToString(children: React.ReactNode): string {
    return String(children);
  }

  const htmlForValue =
    htmlFor ||
    childrenToString(children).trim().toLowerCase().replace(/\s+/g, "-");

  return (
    <label className="uppercase font-bold" htmlFor={htmlForValue}>
      {children}
    </label>
  );
}

export default Label;
