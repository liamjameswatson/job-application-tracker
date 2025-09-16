type RowProps = {
  children: React.ReactNode;
};

function Row({ children }: RowProps) {
  return (
    <div
      className="
        grid grid-cols-1 
       
        ml-4 mr-4 mb-2 
        rounded-2xl bg-blue-300 p-4
        
      "
    >
      <div>{children}</div>
    </div>
  );
}

export default Row;
