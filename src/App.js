import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import BingMapsReact from './BingMapsReact';

const App = () => {
  const [pushPins, setPushPins] = useState([]);
  const [mapReady, setMapReady] = useState(false);
  const [poligon, setPoligon] = useState([]);
  const [longitude, setLongitude] = useState();
  const [latitude, setLatitude] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    setPoligon([
      ...poligon,
      { latitude: Number(latitude), longitude: Number(longitude) },
    ]);
    let newPin = {
      center: {
        latitude: latitude,
        longitude: longitude,
      },
      options: null,
    };
    setPushPins([...pushPins, newPin]);
  };

  useEffect(() => {
    if (mapReady) {
      // addPushPin();
      console.log('map is ready!');
    }
  }, [mapReady]);
  return (
    <div
      className="map__container"
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
      }}
    >
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="latitude">
          <Form.Control
            type="text"
            placeholder="latitude"
            onChange={(e) => setLatitude(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="longitude">
          <Form.Control
            type="text"
            placeholder="longitude"
            onChange={(e) => setLongitude(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit Coords
        </Button>
      </Form>

      <div style={{ height: 800, width: 800 }}>
        <BingMapsReact
          onMapReady={() => setMapReady(true)}
          bingMapsKey={
            'AiUYvygHRcQVIKfJHeFmqUM7b_BWlwHLAnqEiq63-EFY22503vR44ofA4tpBkMEB'
          }
          pushPins={pushPins}
          mapOptions={{
            enableClickableLogo: false,
            navigationBarMode: 'square',
            enableHighDpi: true,
          }}
          polygonPoints={poligon}
        />
      </div>
    </div>
  );
};

export default App;
