type CellProps = {
  children: React.ReactNode;
};

function Cell({ children }: CellProps) {
  return (
    <span className="flex justify-between p-2 text-xl capitalize">
      {children}
    </span>
  );
}

export default Cell;
