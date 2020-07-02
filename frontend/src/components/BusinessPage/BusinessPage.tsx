import React, { useContext, useState, useEffect } from "react";
import "./BusinessPage.scss";
import { ActionContext, StateContext } from "../../hooks";
import BusinessPageBig from "./components/BusinessPageBig";
import BusinessPageSmall from "./components/BusinessPageSmall";
import BusinessItem from "../BusinessItem";
import { useParams } from "react-router-dom";
import { DollarSign, Home, Globe } from "react-feather";
import MetaTags from "react-meta-tags";

function BusinessPage() {
  const { id } = useParams();
  const {
    setModalConfig,
    selectBusiness,
    fetchAllBusinesses,
    getFixedClrMatchingAmount,
    setDonationAmountState,
    getCustomClrMatchingAmount,
    getClrRound,
  } = useContext(ActionContext);
  const {
    backupBusinesses,
    selectedBusiness,
    user,
    fixedDonationMatching,
    customDonationMatching,
    roundDetails,
  } = useContext(StateContext);

  const [donationType, setDonationType] = useState(0);

  useEffect(() => {
    fetchAllBusinesses();
    getClrRound();
    if (id) {
      selectBusiness(id);
      if (user) {
        const matchingArr1 = [
          {
            user_id: user.id,
            business_id: id,
            donation_amount: 10,
          },
          {
            user_id: user.id,
            business_id: id,
            donation_amount: 50,
          },
          {
            user_id: user.id,
            business_id: id,
            donation_amount: 100,
          },
        ];

        getFixedClrMatchingAmount(matchingArr1);

        const matchingArr2 = [
          {
            user_id: user.id,
            business_id: id,
            donation_amount: Number.parseFloat("1"),
          },
        ];
        getCustomClrMatchingAmount(matchingArr2);
      } else {
        const matchingArr1 = [
          {
            user_id: "1",
            business_id: id,
            donation_amount: 10,
          },
          {
            user_id: "1",
            business_id: id,
            donation_amount: 50,
          },
          {
            user_id: "1",
            business_id: id,
            donation_amount: 100,
          },
        ];

        getFixedClrMatchingAmount(matchingArr1);

        const matchingArr2 = [
          {
            user_id: "1",
            business_id: id,
            donation_amount: Number.parseFloat("1"),
          },
        ];
        getCustomClrMatchingAmount(matchingArr2);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, user]);

  const getExpenditureIcons = (type: string) => {
    switch (type.trim().toLowerCase()) {
      case "employee salaries":
        return <DollarSign />;
      case "rent":
        return <Home />;
      case "inventory":
        return <Globe />;
    }
  };

  const handleCustomClrMatchingAmount = (donationAmount) => {
    if (user) {
      const matchingArr = [
        {
          user_id: user.id,
          business_id: id,
          donation_amount: Number.parseFloat(donationAmount),
        },
      ];
      getCustomClrMatchingAmount(matchingArr);
    } else {
      const matchingArr = [
        {
          user_id: "1",
          business_id: id,
          donation_amount: Number.parseFloat(donationAmount),
        },
      ];
      getCustomClrMatchingAmount(matchingArr);
    }
  };

  return (
    <div className="business-page">
      {selectedBusiness && (
        <MetaTags>
          <title>Downtown Stimulus</title>
          <meta name="description" content={selectedBusiness.short_description} />
          <meta property="og:title" content={selectedBusiness.name} />
          <meta property="og:image" content="../../assets/cover.jpg" />
          <meta name="twitter:card" content="summary_large_image" />
        </MetaTags>
      )}
      <BusinessPageBig
        selectedBusiness={selectedBusiness}
        donationType={donationType}
        setDonationType={setDonationType}
        fixedDonationMatching={fixedDonationMatching}
        setDonationAmountState={setDonationAmountState}
        setModalConfig={setModalConfig}
        handleCustomClrMatchingAmount={handleCustomClrMatchingAmount}
        customDonationMatching={customDonationMatching}
        getExpenditureIcons={getExpenditureIcons}
        roundDetails={roundDetails}
      ></BusinessPageBig>
      <BusinessPageSmall
        selectedBusiness={selectedBusiness}
        donationType={donationType}
        setDonationType={setDonationType}
        fixedDonationMatching={fixedDonationMatching}
        setDonationAmountState={setDonationAmountState}
        setModalConfig={setModalConfig}
        handleCustomClrMatchingAmount={handleCustomClrMatchingAmount}
        customDonationMatching={customDonationMatching}
        getExpenditureIcons={getExpenditureIcons}
        roundDetails={roundDetails}
      ></BusinessPageSmall>
      <div className="other-business-container">
        <div className="other-business-list-container">
          <h2 className="other-business-list-title">Other Local Businesses</h2>
          <p className="other-business-list-description">
            {" "}
            Please consider supporting these other amazing Boulder businesses!
          </p>
          <ul className="business-list">
            {backupBusinesses.map((business, i) => (
              <BusinessItem key={i} business={business} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default BusinessPage;
