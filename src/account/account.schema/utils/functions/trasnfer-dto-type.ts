import { TransacationTypes } from '../../../../shared/utils/transaction-types';
import { PixDto, TedDto } from '../../../dto/create-account.dto';

export function transferenciaTypeFactory(obj: any) {
  if (obj.type === TransacationTypes.TED) {
    return TedDto;
  }

  if (obj.type === TransacationTypes.PIX) {
    return PixDto;
  }

  return Object;
}
