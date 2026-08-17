"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsConfig = void 0;
exports.corsConfig = {
    origin: function (origin, callBack) {
        const whiteList = [process.env.FRONTEND_URL];
        if (process.argv[2] === '--api') {
            whiteList.push(undefined);
        }
        if (whiteList.includes(origin)) {
            callBack(null, true);
        }
        else {
            callBack(new Error('Error de cors'));
        }
    }
};
//# sourceMappingURL=cors.js.map