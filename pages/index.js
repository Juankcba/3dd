import React, { useEffect, useState } from "react";

import BasicLayout from "../Layout/BasicLayout";
import Ad from "../Layout/Ad";
import Seo from "../components/Seo";
import { Header, Advertisement, Button } from "semantic-ui-react";
import ListProductos from "../components/Products/ListProductos";
import FullCarrousel from "../components/FullCarrousel";
export default function Home() {
  return (
    <BasicLayout className="home">
      <Seo
        title="Blade Link 3D Printers &mdash; "
        description="Los mejores diseños 3D"
      />

      <div className="publicidad">
        <Advertisement unit="leaderboard">
          <Ad slotId="001" width={728} height={90} />
        </Advertisement>
      </div>
    </BasicLayout>
  );
}
