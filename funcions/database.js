
async function TestConnection( sequelize_obj ) {
    //export const TestConnection = async () => { 
    try {
        await sequelize_obj.authenticate();
        console.log("[OK!]:: sequelize_obj.authenticate() ");
    } catch (err) {
        console.log("[ERR]:: ", err);
    } finally {
        console.log("Fi intent de conectar a la database ")
    };
};

export { TestConnection };