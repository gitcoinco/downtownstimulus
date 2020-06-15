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
  } = useContext(ActionContext);
  const {
    backupBusinesses,
    selectedBusiness,
    user,
    fixedDonationMatching,
    customDonationMatching,
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

  const getExpenditureIcons = (type: string) => {
    switch (type) {
      case "Employee Salaries":
        return <DollarSign />;
      case "Rent":
        return <Home />;
      case "Inventory":
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut
            orci arcu. Integer semper lobortis eleifend. In id urna nec magna
            blandit tempor ornare sed purus.
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
