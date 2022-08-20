
import MapInterface from "../components/Map/MapInterface";

function Map() {
  const helperRequests = [
    {
      title: "Clogged Toilet",
      description: "Help me unclog toilet!",
      location: {
        lat: -3.745,
        lng: -38.523
      },
      contact: {
        phone: "647-647-6477",
        email: "myemail@gmail.com"
      }
    }
  ];
  return (
    <MapInterface helperRequests={helperRequests} />
  );
}

export default Map;
