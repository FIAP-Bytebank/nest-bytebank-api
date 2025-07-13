import { TransacationTypes } from '../../../../shared/utils/transaction-types';
import { PixDto, TedDto } from '../../../dto/create-account.dto';

export function transferenciaTypeFactory(obj: any) {
  if (obj.tipo === TransacationTypes.TED) {
    return TedDto;
  }

  if (obj.tipo === TransacationTypes.PIX) {
    return PixDto;
  }

  return Object;
}
