import { WinstonChannelLogger } from '@kevit/winston-channel-logger';
import { transports, createLogger } from 'winston';

const winstonChannelLogger = new WinstonChannelLogger({
	level: 'silly',
	platforms: [
		// {
		// 	platformName: 'discord',
		// 	webhookUrl:''
		// 		// 'https://discord.com/api/webhooks/1163453342014505061/2-sz0JkuIb9TR3fiJO_rLMRaQinDsFVu2751qk732Q1RdeRB-G4RHFB2mQ7LBjsIXuig',
		// 		,
		// },
	],
});
export const logger = createLogger({
	transports: [
		new transports.Console({ level: 'silly' }),
		winstonChannelLogger,
	],
});
// module.exports = {
//   logger
// };
