import React, { useRef, useState } from 'react';
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import ReactDOMServer from 'react-dom/server';
import { FaMapPin } from 'react-icons/fa';
import { useMap } from '../contexts/MapContext';

function Map({zoom, minZoom, maxZoom, dragging, zoomControl, center, scrollWheelZoom, markers}) {
    const mapRef = useRef()

    return (
        <div className='absolute left-0 top-0 w-full h-full'>
            <canvas className='absolute top-0 left-0 text-white bg-red-500 w-full h-full z-50'>qasdasd</canvas>
            <MapContainer crs={L.extend({}, L.CRS.Simple, {
                projection: L.Projection.LonLat,
                scale: function (zoom) {
                    return Math.pow(2, zoom);
                },
                zoom: function (sc) {
                    return Math.log(sc) / 0.6931471805599453;
                },
                distance: function (pos1, pos2) {
                    var x_difference = pos2.lng - pos1.lng;
                    var y_difference = pos2.lat - pos1.lat;
                    return Math.sqrt(x_difference * x_difference + y_difference * y_difference);
                },
                transformation: new L.Transformation(0.02072, 117.3, -0.0205, 172.8),
                infinite: true
            })} preferCanvas={true} minZoom={minZoom??2} maxZoom={maxZoom??4} center={center??[0.0, 0.0]} scrollWheelZoom={scrollWheelZoom??true} zoom={zoom??2} doubleClickZoom={markers ? false : true} attributionControl={false} dragging={dragging??true} zoomControl={zoomControl??true} ref={mapRef}>
                <TileLayer
                    url="https://nanoproject-s.github.io/mapstyles/{z}/{x}/{y}.jpg"
                />

                {/* {markers?.map(marker => <Item data={marker} />)} */}
            </MapContainer>
        </div>
    );
}


export default Map