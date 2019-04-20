const privateResolver = resolverFunction => async (
  parent,
  args,
  context,
  info
) => {
  const { user } = context.req;
  if (!user) {
    throw new Error("Sorry there is no Token");
  }
  const resolved = await resolverFunction(parent, args, context, info);
  return resolved;
};

export default privateResolver;
