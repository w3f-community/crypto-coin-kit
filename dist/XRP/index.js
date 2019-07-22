"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
var ripple_address_codec_1 = require("ripple-address-codec");
// @ts-ignore
var ripple_keypairs_1 = require("ripple-keypairs");
var coin_1 = __importDefault(require("../Common/coin"));
var transaction_1 = require("./transaction");
var XRP = /** @class */ (function (_super) {
    __extends(XRP, _super);
    function XRP() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.generateAddress = function (publicKey) {
            return ripple_keypairs_1.deriveAddress(publicKey);
        };
        _this.isAddressValid = function (address) {
            return ripple_address_codec_1.isValidAddress(address);
        };
        _this.generateTxBuilder = function (args) {
            return new transaction_1.TransactionBuilder(args);
        };
        return _this;
    }
    return XRP;
}(coin_1.default));
exports.XRP = XRP;
