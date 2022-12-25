/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import {
  GoogleMap, InfoWindow,
} from '@react-google-maps/api';
import Geocode from 'react-geocode';
import { Avatar } from 'flowbite-react';
import Link from 'next/link';
import styles from '../styles/Gallery.module.css';

const Coordinates = async address => {
  Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);

  const geoLocations = await Geocode.fromAddress(address)
    .then(res => res.results[0].geometry.location)
    // eslint-disable-next-line no-console
    .catch(error => console.error(error));
  return geoLocations;
};

const Map = ({ professionals, inputLocation }) => {
  const [coords, setCoords] = useState([]);
  const [centerCoords, setCenterCoords] = useState([]);

  useEffect(
    () => {
      if (professionals) {
        Promise.all(
          professionals.map(
            pro => Coordinates(pro.professionalAddress),
          ),
        ).then(coordArr => {
          setCoords(coordArr);
        });
      }
    },
    [professionals],
  );

  useEffect(
    () => {
      if (inputLocation) {
        Promise.all([Coordinates(inputLocation)]).then(location => {
          setCenterCoords(location);
        });
      }
    },
    [inputLocation, professionals],
  );

  return (
    <GoogleMap
      zoom={13}
      options={{
        zoomControl: false,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
      }}
      center={centerCoords[0]}
      mapContainerClassName={styles.mapContainer}>

      {coords.map((coord, i) => (
        <>
          <Link key={professionals[i].id} href={`/gallery/${professionals[i].id}`}>
            <InfoWindow
              // key={professionals[i].id}
              position={coord}
              className="try1">
              <div className={styles.infoWindow}>
                <Avatar
                  img={professionals[i].professionalImage}
                  rounded>
                  <div className="space-y-1 font-medium dark:text-white">
                    <div>
                      {professionals[i].professionalName}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {professionals[i].professionalService}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {professionals[i].professionalPrice}
                      {' '}
                      kr SEK
                    </div>
                  </div>
                </Avatar>
              </div>
            </InfoWindow>
          </Link>
        </>

      ))}
    </GoogleMap>
  );
};

export default Map;
