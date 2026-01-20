export const database = ['apple','orange','banana','strawberry']

export default defineEventHandler((event) => {
    return {
        hello: 'world',
        data:database
    }
})