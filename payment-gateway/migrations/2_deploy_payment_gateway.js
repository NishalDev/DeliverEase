const PaymentGateway = artifacts.require("PaymentGateway");

module.exports = function (deployer) {
    // Deploy the PaymentGateway contract
    deployer.deploy(PaymentGateway)
        .then(() => {
            // Optional: Log a success message after deployment
            console.log("PaymentGateway contract deployed successfully!");
        })
        .catch((error) => {
            console.error("Error deploying PaymentGateway contract:", error);
        });
};
