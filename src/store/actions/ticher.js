import { LOAD_TICHER } from '../types'
import { TICHER } from '../../data'

export const loadTicher = () => {
  return {
    type: LOAD_TICHER,
    data: TICHER
  }
}