"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminGuard = void 0;
class AdminGuard {
    canActivate(context) {
        const req = context.switchToHttp().getRequest();
        if (!req.currentUser) {
            return false;
        }
        if (req.currentUser.admin) {
            return true;
        }
        else {
            return false;
        }
    }
}
exports.AdminGuard = AdminGuard;
//# sourceMappingURL=admin.guard.js.map