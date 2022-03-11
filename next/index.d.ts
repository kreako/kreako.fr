// To import png image resize at 48px (width)
// Yes not so nice but only 1 wildcard is allowed in module declaration
declare module "*.png?resize&size=48" {
  const content: any
  export default content
}
// resize at 256px (width)
declare module "*.png?resize&size=256" {
  const content: any
  export default content
}
