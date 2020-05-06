"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/common/http");
var UserService = /** @class */ (function () {
    function UserService(http, baseUrl) {
        this.http = http;
        this.baseUrl = baseUrl;
        this.url = baseUrl + "api/users";
    }
    UserService.prototype.getAllUsers = function () {
        return this.http.get(this.url);
    };
    UserService.prototype.getUserById = function (userid) {
        return this.http.get(this.url);
    };
    UserService.prototype.createUser = function (user) {
        var httpOptions = { headers: new http_1.HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.post(this.url, user, httpOptions);
    };
    UserService.prototype.updateUser = function (user) {
        var httpOptions = { headers: new http_1.HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.put(this.url, user, httpOptions);
    };
    UserService.prototype.deleteUserById = function (userid) {
        var httpOptions = { headers: new http_1.HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.delete(this.url + userid, httpOptions);
    };
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=UserService.js.map