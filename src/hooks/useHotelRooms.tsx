import { useCallback, useEffect, useState } from "react";
import { ROOMS_PER_PAGE, URL_ROOMS, URL_ROOM_DETAILS } from "../constants";
import { Room, RoomResponse, AvailabilityResponse } from "../types";

export function useHotelRooms() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [currentRooms, setCurrentRooms] = useState<Room[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("name");

  const sortRooms = useCallback(
    (a: Room, b: Room) => {
      if (sortBy === "name") {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();

        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        return 0;
      } else if (sortBy === "price") {
        return a.price.value - b.price.value;
      } else {
        return 0;
      }
    },
    [sortBy]
  );

  useEffect(() => {
    const fetchRooms = async () => {
      const response = await fetch(URL_ROOMS);
      const roomsResponse: RoomResponse[] = await response.json();

      const roomsDetailsPromises = roomsResponse.map((room) =>
        fetch(`${URL_ROOM_DETAILS}/${room.id}`).then((response) =>
          response.json()
        )
      );

      const roomsDetails: AvailabilityResponse[] = await Promise.all(
        roomsDetailsPromises
      );
      const roomsWithAdditionalData = roomsResponse.map((room, idx) => ({
        ...room,
        availabilityStatus: roomsDetails[idx].availabilityStatus,
        actualPrice: roomsDetails[idx].price,
      }));

      setRooms(roomsWithAdditionalData.sort(sortRooms));
    };

    fetchRooms();
  }, [sortRooms]);

  useEffect(() => {
    const lastRoomIdx = currentPage * ROOMS_PER_PAGE;
    const firstRoomIdx = lastRoomIdx - ROOMS_PER_PAGE;
    setCurrentRooms(rooms.slice(firstRoomIdx, lastRoomIdx));
  }, [currentPage, rooms, sortBy]);

  useEffect(() => {
    const sortedRooms = rooms.sort(sortRooms);

    setRooms(sortedRooms);
  }, [sortBy, sortRooms, rooms]);

  return {
    currentPage,
    setCurrentPage,
    rooms: currentRooms,
    sortBy,
    setSortBy,
  };
}
