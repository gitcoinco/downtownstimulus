import React, { useContext, useState, useEffect } from "react";
import "./BusinessPage.scss";
import { ActionContext, StateContext } from "../../hooks";
import BusinessPageBig from "./components/BusinessPageBig";
import BusinessPageSmall from "./components/BusinessPageSmall";
import BusinessItem from "../BusinessItem";
import { useParams } from "react-router-dom";
import { DollarSign, Home, Globe } from "react-feather";

function BusinessPage() {
  let { id } = useParams();
  const {
    setModalConfig,
    selectBusiness,
    fetchAllBusinesses,
    getFixedClrMatchingAmount,
    setDonationAmountState,
    getCustomClrMatchingAmount,
    setOpenedQfExplainerFirstTime,
  } = useContext(ActionContext);
  const {
    backupBusinesses,
    selectedBusiness,
    user,
    fixedDonationMatching,
    customDonationMatching,
    openedQfExplainerFirstTime,
  } = useContext(StateContext);

  const [donationType, setDonationType] = useState(0);

  useEffect(() => {
    fetchAllBusinesses();
    if (id) {
      selectBusiness(id);
      if (user) {
        console.log("User", user);
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
      }
    }
  }, [id, user]);

  useEffect(() => {
    if (!openedQfExplainerFirstTime) {
      setModalConfig(true, { type: "qfExplainer" });
      setOpenedQfExplainerFirstTime(true);
    }
  }, []);

  const getExpenditureIcons = (type: string) => {
    console.log(type);
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
    console.log("Logging donation change stop");
    setDonationAmountState(donationAmount);
    if (user) {
      console.log(donationAmount);
      const matchingArr = [
        {
          user_id: user.id,
          business_id: id,
          donation_amount: Number.parseFloat(donationAmount),
        },
      ];
      getCustomClrMatchingAmount(matchingArr);
    }
  };

  return (
    <div className="business-page">
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
