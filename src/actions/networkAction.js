export const NETWORK_STATUS = 'NETWORK_STATUS';

export const setNetWorkStatus = ({connected}) => {
  return {
    type: NETWORK_STATUS,
    payload: connected,
  }
}
