//  validating the output from /documentation to be added to the api's to show errors on console

export function validationError(request, h, error) {
  console.log(error.message);
}