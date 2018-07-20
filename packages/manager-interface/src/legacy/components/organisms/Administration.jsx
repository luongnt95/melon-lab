import React from "react";
import { List, Card } from "semantic-ui-react";

const Administration = ({
  subscriptionAllowed,
  toggleSubscription,
  toggleRedemption,
  convertUnclaimedRewards,
  shutdown,
  loading,
  registerForCompetition,
  fundAddress,
  isCompeting,
  quoteAsset,
}) => (
    <div id="settings">
        <h3>Fund Administration</h3>
        <List>
          {/* {!isCompeting ? (
          <List.Item as="a" onClick={() => registerForCompetition(fundAddress)}>
            <List.Content>Register for competition</List.Content>
          </List.Item>
        ) : (
          ""
        )} */}
          {subscriptionAllowed ? (
            <List.Item as="a" onClick={toggleSubscription}>
              <List.Content>Disable subscription</List.Content>
            </List.Item>
          ) : (
              <List.Item as="a" onClick={toggleSubscription}>
                <List.Content>Enable subscription</List.Content>
              </List.Item>
            )}

          <List.Item as="a" onClick={convertUnclaimedRewards}>
            <List.Content>Convert unclaimed rewards: 0 {quoteAsset}</List.Content>
          </List.Item>
          <List.Item as="a" onClick={shutdown}>
            <List.Content>Irreversibly shut down fund</List.Content>
          </List.Item>
        </List>
      <div className={`ui ${loading ? "active" : ""} inverted dimmer`}>
        <div className="ui text loader">
          Please wait for upcoming Metamask popup
      </div>
      </div>
    </div>
  );

export default Administration;
