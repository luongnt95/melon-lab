import React from "react";
import { Field } from "redux-form";
import { List, Button, Card, Menu } from "semantic-ui-react";
import NumberInput from "../molecules/NumberInput";


const ParosContributionForm = ({
    handleSubmit,
  displayNumber,
  dataValid,
  melonAssetSymbol,
}) => (
    <Card id="parosContribution" centered>
      <Card.Content>
        <Card.Header> <p style={{ fontSize: '1.2em', color: 'red', fontFamily: 'monospace', fontWeight: 'bold', }}>ATTENTION REQUIRED: Contribution to Paros </p></Card.Header>

        <p style={{ fontSize: '1.1em' }}> You are about to send ether to the Paros contract. Please type in the amount of ETH you wish to contribute in the Paros Olympiad. </p>
        <form onSubmit={handleSubmit} name="parosContribution">

          <List>
            <List.Item>
              <List.Content>
                <Field
                  label="Quantity of ETH to contribute"
                  name="amount"
                  component={NumberInput}
                  type="number"
                  format={displayNumber}
                  disabled={!dataValid}
                />
              </List.Content>
            </List.Item>

            <div>

              <List.Item>
                <List.Content>
                  <Field
                    label={`Estimated ${melonAssetSymbol} to receive`}
                    name="total"
                    component={NumberInput}
                    format={displayNumber}
                    type="number"
                    disabled={!dataValid}
                  />
                </List.Content>
              </List.Item>
            </div>

          </List>

          {!dataValid ? (
            <p style={{ color: "rgb(209, 102, 102)" }}>
              Contribution not authorized when price feed down
          </p>
          ) : null}
          <p style={{ fontSize: '0.9em', color: 'orange', fontFamily: 'monospace', fontWeight: 'bold', }}>This step will transfer the desired amount of ETH from your wallet to the Paros Contribution contract. The Paros Contribution contract will then invest the corresponding amount of MLN into your Melon fund (as per terms and conditions). By proceeding you acknowledge your understanding of the terms and conditions (<a href="https://github.com/melonproject/contribution/blob/master/Melonport%20AG_Capsule%201%20terms%20July%2020.pdf" target="_blank">available here</a>) and agree to cryptographically sign them. </p>
          <p style={{ fontSize: '1.2em', color: 'red', fontFamily: 'monospace', fontWeight: 'bold', }}>Melonport AG cannot be held liable for any action resulting in fund loss while using the Melon software. </p>

          <Button
            basic
            color="black"
            style={{ width: "100%" }}
            disabled={!dataValid}
          >
            I agree, sign and contribute
        </Button>
        </form>
      </Card.Content>
    </Card>
  );

export default ParosContributionForm;
