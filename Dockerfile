FROM public.ecr.aws/lambda/nodejs:18 AS builder
WORKDIR /usr/app
COPY .  ./
RUN npm install
RUN npm run build

FROM public.ecr.aws/lambda/nodejs:18
WORKDIR ${LAMBDA_TASK_ROOT}
COPY --from=builder /usr/app/dist/* ./
CMD ["index.handler"]