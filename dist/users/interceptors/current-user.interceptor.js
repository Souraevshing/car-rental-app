"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentUserInterceptor = void 0;
class CurrentUserInterceptor {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async intercept(context, handler) {
        const req = context.switchToHttp().getRequest();
        const { userId } = req.session;
        console.log(userId);
        if (userId) {
            const user = await this.usersService.findOne(userId);
            req.currentUser = user;
        }
        return handler.handle();
    }
}
exports.CurrentUserInterceptor = CurrentUserInterceptor;
//# sourceMappingURL=current-user.interceptor.js.map