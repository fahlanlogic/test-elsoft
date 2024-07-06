export default function ItemComponent() {
  return (
    <main className="text-neutral-700 p-2 w-full flex-1 pt-6">
      <h1 className="text-3xl font-bold mb-8 mt-2">List Item</h1>
      <div className="border border-b border-neutral-200 w-[98%] mb-8"></div>
      <div className="bg-white w-full min-h-[80vh]">
        <div className="header-table flex justify-between items-center gap-3">
          <input
            type="checkbox"
            className="w-5 h-5 accent-blue-900"
          />
          <select
            name="CompanyName"
            id="CompanyName"
            className="block w-full p-1.5 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
            <option
              value="d3170153-6b16-4397-bf89-96533ee149ee"
              className="bg-white text-neutral-900 py-3 my-1">
              testcase
            </option>
            <option
              value="d3170153-6b16-4397-bf89-96533ee149ee"
              className="bg-white text-neutral-900 py-3 my-1">
              testcase
            </option>
          </select>
        </div>
      </div>
    </main>
  );
}
