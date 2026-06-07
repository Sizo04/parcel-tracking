import {
  faCheckCircle,
  faTruck,
  faClock,
  faBox,
} from "@fortawesome/free-solid-svg-icons";

export const getStatusIcon = (status: string) => {
  switch (status.toLowerCase()) {
    case "delivered":
      return {
        icon: faCheckCircle,
        color: "text-green-500",
      };

    case "in transit":
      return {
        icon: faTruck,
        color: "text-blue-500",
      };

    case "pending":
      return {
        icon: faClock,
        color: "text-yellow-500",
      };

    default:
      return {
        icon: faBox,
        color: "text-gray-400",
      };
  }
};
