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
                <Card.Header>ParosContribution</Card.Header>
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

                    <Button
                        basic
                        color="black"
                        style={{ width: "100%" }}
                        disabled={!dataValid}
                    >
                        Send contribution
        </Button>
                </form>
            </Card.Content>
        </Card>
    );

export default ParosContributionForm;
