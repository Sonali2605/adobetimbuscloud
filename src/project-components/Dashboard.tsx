import React, { useEffect, useState } from 'react';
import Header from './Header';
import DashboardHeading from './DashboardHeading';
import LineChart from './LineChart';
import ProfileCard from './ProfileCard';
import Badges from './Badges';
import CertificateCard from './Certificate';
import axios from 'axios';

const Dashboard = () => {
  const [certificate, setCertificate] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://learningmanager.adobe.com/primeapi/v2/learningObjects?include=subLOs&page[limit]=1&filter.loTypes=certification&sort=-date&filter.ignoreEnhancedLP=true',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const certificateData = response.data?.data?.[0];
        if (certificateData) {
          const certificateName = certificateData.attributes.localizedMetadata.find(
            (metadata) => metadata.name === 'Consultative Selling'
          );

          if (certificateName) {
            const imageUrl = certificateData.attributes.imageUrl;
            const name = certificateName.name;
            const description = certificateName.description;

            setCertificate({ imageUrl, name, description });
          }
        }
      } catch (error) {
        console.error('Error fetching certificate:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Header isLogin={false} />
      <div className="mt-5 px-10">
        <DashboardHeading />
        <div className="grid grid-rows-3 grid-flow-col gap-4 ">
          <div className="row-start-1 row-span-4 max-w-xs">
            <ProfileCard name="Olivia Clarke" />
            <Badges />
            {certificate && (
              <CertificateCard
                imageUrl={certificate.imageUrl}
                name={certificate.name}
                description={certificate.description}
              />
            )}
          </div>
          <div className="row-start-1 row-end-4"><LineChart /></div>
          {/* Render the certificate card only if certificate data exists */}
          {certificate && (
            <div className="row-start-1 row-end-4">
              <CertificateCard
                imageUrl={certificate.imageUrl}
                name={certificate.name}
                description={certificate.description}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
