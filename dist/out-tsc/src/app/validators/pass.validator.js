var PasswordValidator = /** @class */ (function () {
    function PasswordValidator() {
    }
    PasswordValidator.validPassword = function (group) {
        var pass = group.controls.password.value;
        var confirmPass = group.controls.conf_password.value;
        return pass === confirmPass ? null : { noMatch: true };
    };
    return PasswordValidator;
}());
export { PasswordValidator };
//# sourceMappingURL=pass.validator.js.map