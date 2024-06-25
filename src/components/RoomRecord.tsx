import { AvailabilityStatusEnum, Room } from "../types";
import { Button } from "./common/Button";

type Props = {
  room: Room;
};

export function RoomRecord({ room }: Props): React.ReactNode {
  const { id, name, price, actualPrice, availabilityStatus } = room;
  const isRoomAvailable = [AvailabilityStatusEnum[0], AvailabilityStatusEnum[1]].includes(
    availabilityStatus
  );

  return (
    <tr
      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
    >
      <th className="px-2 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {name}
      </th>
      <td>{`${price.currencyCode} ${price.value}`}</td>
      <td>
        {isRoomAvailable
          ? `${actualPrice.currencyCode} ${actualPrice.value}`
          : ""}
      </td>
      <td>
        {isRoomAvailable
          ? `${price.currencyCode} ${actualPrice.value - price.value}`
          : ""}
      </td>
      <td>{availabilityStatus}</td>
      <td>
        {isRoomAvailable && (
          <Button onClick={() => console.log(`You've booked room #${id}`)}>
            Book the room
          </Button>
        )}
      </td>
    </tr>
  );
}
