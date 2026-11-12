interface TableProps {
  columns: string[];
  data: Record<string, any>[];
  onClick: (id: number) => void;
}

const Table = ({ columns, data, onClick }: TableProps) => {
  return (
    <div className="relative mt-2 shadow-md rounded-lg overflow-hidden h-full flex flex-col">
      <div className="overflow-auto flex-1">
        <table className="w-full text-sm text-left rtl:text-right text-[var(--text-secondary)]">
          <thead className="sticky top-0 z-10 text-xs uppercase bg-[var(--background-paper)] text-[var(--text-secondary)]">
            <tr>
              {columns.map((col, index) => (
                <th
                  key={index}
                  scope="col"
                  className="px-6 py-3 border-b border-[var(--border)] bg-[var(--background-paper)]"
                >
                  {col}
                </th>
              ))}
              <th className="px-6 py-3 border-b border-[var(--border)] bg-[var(--background-paper)]">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="bg-[var(--background-default)] border-b border-[var(--border)] hover:bg-[var(--background-secondary)] cursor-pointer"
                onClick={() => onClick(row["no"])}
              >
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className={`px-6 py-4 ${
                      colIndex === 0
                        ? "font-medium text-[var(--text-primary)] whitespace-nowrap"
                        : ""
                    }`}
                  >
                    {row[col]}
                  </td>
                ))}
                <td className="px-6 py-4 text-right">
                  <a
                    href="#"
                    className="font-medium text-[var(--accent-blue)] hover:text-[var(--hover-accentBlue)]"
                  >
                    Edit
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
