import React, { memo } from "react";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";

const geoUrl =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const MapChart = ({ alpha3code }) => {
  console.log("MapChart --> Received alpha3code:", alpha3code);

  return (
    <>
      <ComposableMap projectionConfig={{ scale: 200 }}>
        <ZoomableGroup>
          <Geographies geography={geoUrl}>
            {({ geographies }) => {
              // Log first geography to see structure
              if (geographies.length > 0) {
                console.log("MapChart --> Sample geography:", geographies[0]);
              }

              return geographies.map((geo) => {
                // world-atlas uses 'id' property which contains the ISO alpha-3 code
                const geoId = geo.id || geo.properties?.ISO_A3 || geo.properties?.ADM0_A3;
                const isSelected = geoId === alpha3code;

                // Debug logging
                if (isSelected) {
                  console.log("MapChart --> MATCH FOUND! geoId:", geoId, "alpha3code:", alpha3code);
                }

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content={geo.properties?.name || geo.properties?.NAME}
                    style={{
                      default: {
                        fill: isSelected ? "#F53" : "#D6D6DA",
                        outline: "none",
                      },
                      hover: {
                        fill: isSelected ? "#F53" : "#CFD8DC",
                        outline: "none",
                      },
                    }}
                  />
                );
              });
            }}
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </>
  );
};

export default memo(MapChart);
