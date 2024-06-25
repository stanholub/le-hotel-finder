import { ChangeEvent } from "react";
import { RoomRecord } from "./components/RoomRecord";
import { useHotelRooms } from "./hooks/useHotelRooms";

function App() {
  const { currentPage, setCurrentPage, rooms, sortBy, setSortBy } =
    useHotelRooms();

  const handleSortByChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    setSortBy(e.target.value);
  };

  const handlePageChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setCurrentPage(parseInt(e.target.value));
  };

  return (
    <main className="flex flex-col justify-center items-center h-screen">
      {rooms?.length > 0 && (
        <div className="flex items-center my-2">
          <label>
            Current page:
            <input
              className="px-2 py-2 mx-2 border rounded-md"
              type="number"
              min="1"
              max="4"
              value={currentPage}
              onChange={handlePageChange}
            ></input>
          </label>
          <label>
            Sort by:
            <select
              className="px-2 py-2 mx-2 border rounded-md"
              value={sortBy}
              onChange={handleSortByChange}
            >
              <option value="name">Name</option>
              <option value="price">Price</option>
            </select>
          </label>
        </div>
      )}
      {rooms?.length > 0 && (
        <>
          <table className="w-3/4 border-collapse border table-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="bg-blue-300">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Original price</th>
                <th className="px-6 py-3">Actual price</th>
                <th className="px-6 py-3">Price difference</th>
                <th className="px-6 py-3">Availability</th>
                <th className="px-6 py-3">Book</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => (
                <RoomRecord key={room.id} room={room} />
              ))}
            </tbody>
          </table>
        </>
      )}
    </main>
  );
}

export default App;
