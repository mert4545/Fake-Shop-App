export const updateState = (oldState, updatedValues) => ({  // utility function which will be used to update state
    ...oldState,
    ...updatedValues
});