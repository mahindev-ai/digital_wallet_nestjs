import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './user/user.module';
import { AccountModule } from './account/account.module';
import { BankTransferModule } from './bank-transfer/bank-transfer.module';
import { InterbankTransferModule } from './interbank-transfer/interbank-transfer.module';
import { ServiceModule } from './service/service.module';
import { ServicePaymentModule } from './service-payment/service-payment.module';
import { TransactionModule } from './transaction/transaction.module';
import { TransactionLogModule } from './transaction-log/transaction-log.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'your_jwt_secret_key',  // Usa una clave secreta segura
      signOptions: { expiresIn: '1h' },  // Opciones de expiración del token
    }),
    UserModule,
    AccountModule,
    BankTransferModule,
    InterbankTransferModule,
    ServiceModule,
    ServicePaymentModule,
    TransactionModule,
    TransactionLogModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
