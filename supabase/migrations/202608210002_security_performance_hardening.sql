-- Restrict the platform event-trigger function from Data API roles.
-- The event trigger continues to run as its owner when DDL is executed.
revoke execute on function public.rls_auto_enable() from public, anon, authenticated;

create index if not exists addresses_user_id_idx on public.addresses(user_id);
create index if not exists orders_user_id_idx on public.orders(user_id);
create index if not exists orders_status_created_at_idx on public.orders(status, created_at desc);
create index if not exists order_items_order_id_idx on public.order_items(order_id);
create index if not exists order_items_product_id_idx on public.order_items(product_id);
create index if not exists products_active_category_idx on public.products(is_active, category);

drop policy if exists "Public can view active products" on public.products;
drop policy if exists "Admins manage products" on public.products;
create policy "Visitors view active products" on public.products
  for select to anon using (is_active);
create policy "Members view products" on public.products
  for select to authenticated using (is_active or (select private.is_admin()));
create policy "Admins insert products" on public.products
  for insert to authenticated with check ((select private.is_admin()));
create policy "Admins update products" on public.products
  for update to authenticated using ((select private.is_admin())) with check ((select private.is_admin()));
create policy "Admins delete products" on public.products
  for delete to authenticated using ((select private.is_admin()));

drop policy if exists "Users manage own addresses" on public.addresses;
drop policy if exists "Admins view addresses" on public.addresses;
create policy "Members view permitted addresses" on public.addresses
  for select to authenticated using ((select auth.uid()) = user_id or (select private.is_admin()));
create policy "Users insert own addresses" on public.addresses
  for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "Users update own addresses" on public.addresses
  for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "Users delete own addresses" on public.addresses
  for delete to authenticated using ((select auth.uid()) = user_id);

drop policy if exists "Users view own orders" on public.orders;
drop policy if exists "Admins view orders" on public.orders;
create policy "Members view permitted orders" on public.orders
  for select to authenticated using ((select auth.uid()) = user_id or (select private.is_admin()));

drop policy if exists "Users view own order items" on public.order_items;
drop policy if exists "Admins view order items" on public.order_items;
create policy "Members view permitted order items" on public.order_items
  for select to authenticated using (
    (select private.is_admin()) or exists (
      select 1 from public.orders
      where orders.id = order_items.order_id
        and orders.user_id = (select auth.uid())
    )
  );
