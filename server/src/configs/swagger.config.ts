import swagger from "@elysiajs/swagger";

export const swaggerConfig =  swagger({
    path: '/api-doc',
    documentation: {
        info: {
            title: "Tinner App API",
            version: "SUPPER BETA 0.0.1"
        }
    }
})